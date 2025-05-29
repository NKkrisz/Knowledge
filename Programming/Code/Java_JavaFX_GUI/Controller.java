package com.nkkrisz.kigyokgui;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.FileChooser;

import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class Controller {
    @FXML MenuItem OpenMenuItem;
    @FXML MenuItem CloseMenuItem;
    @FXML MenuItem AboutMenuItem;
    @FXML ListView<String> ExampleListView1;
    @FXML TextField ExampleTextField;
    @FXML Button ExampleButton;
    @FXML ListView<String> ExampleListView2;

    private FileChooser fileChooser = new FileChooser();

    private class Kigyo {
        String faj;
        int hossz;
        String elofordulas;
        boolean merges;

        public Kigyo(String line){
            String[] splitLine = line.split(";");
            faj = splitLine[0];
            hossz = Integer.parseInt(splitLine[1]);
            elofordulas = splitLine[2];
            merges = splitLine[3].equals("Igen");
        }
    }

    ArrayList<Kigyo> kigyok = new ArrayList<>();

    public void initialize(){
        //Load into this project's directory by default
        fileChooser.setInitialDirectory(new File("./"));
        //Only accept .csv files
        fileChooser.getExtensionFilters().add(new FileChooser.ExtensionFilter(".csv Files", "*.csv"));
    }

    @FXML private void LoadFile(){
        File file = fileChooser.showOpenDialog(ExampleButton.getScene().getWindow());

        if(file != null){
            //Restart everything so it only shows currently loaded data
            kigyok.clear();
            ExampleListView1.getItems().clear();
            ExampleListView2.getItems().clear();
            ExampleTextField.clear();
            try{
                //Load selected file
                Scanner scanner = new Scanner(file);

                //Skip header / first line
                scanner.nextLine();

                while(scanner.hasNextLine()){
                    Kigyo kigyo = new Kigyo(scanner.nextLine());
                    //Add item to ArrayList
                    kigyok.add(kigyo);
                    //Add item in ListView
                    ExampleListView1.getItems().add(String.format("%s (%dcm), %s", kigyo.faj, kigyo.hossz, kigyo.elofordulas));
                }

                //Close after done reading file
                scanner.close();

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @FXML private void CloseProgram(){
        Platform.exit();
    }

    @FXML private void ShowAbout(){
        Alert about = new Alert(Alert.AlertType.INFORMATION, "Task v.1.0.0\n(C) Copyright Owner");
        about.setTitle("About");
        about.setHeaderText("");
        about.showAndWait();
    }

    @FXML private void Filter(){
        //Clear previous items
        ExampleListView2.getItems().clear();

        //Convert both text to lowercase so they are case-insensitive when trying to match
        String inputText = ExampleTextField.getText().toLowerCase();

        //Don't do show all items with no input
        if(inputText.equals("")) return;

        for(Kigyo kigyo : kigyok){
            if(kigyo.faj.toLowerCase().contains(inputText)){
                ExampleListView2.getItems().add(kigyo.faj);
            }
        }
    }
}
# Java Snippets

## Configuration
- Make sure projects and files are named correctly
- Put data files (.csv) into the root of the project

```
public class Main {
    // Write Classes, File Loading Here
    
    public Main() {
        //Do Tasks Here, might need to add IOException
    }

    //Don't touch unless IOException needed
    public static void main(String[] args) {
        new Main();
    }
}

```

## Terminal Application Snippets

### Logging

#### General
```
\n //New line
\t //Tab
\\ //Breakout
System.out.print(); //No line break
System.out.println(); //Line break
String.join(", ", ArrayList) //Convert ArrayList to String with "," separation and no brackets "[]"
```

#### System.out.printf();
```
%s //Strings
%d //Numbers
%f //Floating Numbers -> %0.2f - .00 precision
```

### Example Class
```
private class Kigyo {
    String fajta;
    int hossz;
    String elofordulas;
    boolean merges;

    public Kigyo(String line) {
        //.csv uses "," or ";"
        String[] splitLine = line.split(";");

        fajta = splitLine[0];
        hossz = Integer.parseInt(splitLine[1]);
        elofordulas = splitLine[2];
        merges = splitLine[3].equals("Igen");
    }
}
```

### File Loading And Adding Items To ArrayList
```
private void loadFile(String fileName){
        Scanner scanner = null;

        try{
            scanner = new Scanner(new File(fileName));

            // Skip header / first line
            scanner.nextLine();

            while (scanner.hasNextLine()){
                kigyok.add(new Kigyo(scanner.nextLine()));
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if(scanner != null) scanner.close();
        }
    }

    ArrayList<Kigyo> kigyok = new ArrayList<>();
```

### Random
```
ArrayList.get((int) (Math.random()*ArrayList.size())) //Get random item from ArrayList
```

#### Randomly trying until condition is met example
```
Kigyo randomMerges = kigyok.get((int) (Math.random()*kigyok.size()));

if(!randomMerges.merges){
    while (!randomMerges.merges){
        randomMerges = kigyok.get((int) (Math.random() * kigyok.size()));
    }
}
```

### TreeMap Example
```
//Treemaps are sorted by default
TreeMap<String, Integer> fajSzamlalo = new TreeMap<>();

for(Kigyo kigyo : kigyok){
    // Some items might not need splitting
    String kigyoFaj = kigyo.fajta.contains(" ") ? kigyo.fajta.split(" ")[1] : kigyo.fajta;

    //First add to treemap with initial value of 1, if it already exists increase the value by 1
    if(!fajSzamlalo.containsKey(kigyoFaj)){
        fajSzamlalo.put(kigyoFaj, 1);
    } else {
        fajSzamlalo.put(kigyoFaj, fajSzamlalo.get(kigyoFaj) + 1);
    }
}

System.out.println("5) Az adott fajhoz (abc) tartozo kigyok darabszama:");
for(String faj : fajSzamlalo.keySet()){
    System.out.printf("\t%s : %d\n", faj, fajSzamlalo.get(faj));
}
```

### FileWriter Example
```
//Task #7 - Write items with specific data to a file
FileWriter writer = null;

try{
    writer = new FileWriter(new File("kobra.txt"));

    for(Kigyo kigyo : kigyok){
        String kigyoFaj = kigyo.fajta.contains(" ") ? kigyo.fajta.split(" ")[1] : kigyo.fajta;
        if(kigyoFaj.equals("Kobra")){
            writer.write(kigyo.fajta + " ("+ kigyo.hossz +"cm)\n");
        }
    }
} catch (Exception e) {
    System.out.println(e);
} finally {
    if(writer != null) writer.close();
}

System.out.println("7) Minden Kobra mentve a kobra.txt fajlba");
```


## GUI (JavaFX) Application Snippets

### Which Element Where?
- Containers
    - Vbox
    - Hbox
- Controls
    - Button
    - CheckBox
    - Label
    - ListView
    - MenuBar
    - TextArea
    - TextField
- Menu
    - Menu
    - MenuItem

### Styling
- Set VGrow to Always on elements to be responsive
- Set Spacing and Padding to separate items from each other

### Interactions
- Give ```fx:id``` to elements
- Refer to elements like this in the Controller: ```@FXML``` ```ElementType``` ```fx:id```
- Start functions that are called with UI elements with ```@FXML```

#### Setting Accelerator (Shortcut) With Scene Builder - CTRL + O Example
- Select Element
- Properties
    - Accelerator
        - Modifier 1: ```CONTROL_DOWN```
        - Main Key: ```O```
- Code
    - On Action: ```fxmlFunctionName```

### Clean Start

#### App.java
```
package com.nkkrisz.task;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class App extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("Layout.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        stage.setTitle("Task");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}
```

#### Controller.java
```
package com.nkkrisz.task;

public class Controller {

}
```

#### Layout.fxml
```
<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.scene.layout.*?>


<VBox xmlns="http://javafx.com/javafx/17.0.12" xmlns:fx="http://javafx.com/fxml/1" fx:controller="com.nkkrisz.task.Controller" />
```

## Logic

### File Menu

#### Load File From File Chooser (with .csv files allowed only and starting in project's directory)
```
private FileChooser fileChooser = new FileChooser();

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
```

#### Close Program
```
@FXML private void CloseProgram(){
    Platform.exit();
}
```

### About Menu
```
@FXML private void ShowAbout(){
    Alert about = new Alert(Alert.AlertType.INFORMATION, "Task v.1.0.0\n(C) Copyright Owner");
    about.setTitle("About");
    about.setHeaderText("");
    about.showAndWait();
}
```

## Layout With MenuBar, 2 Menus, 2 ListViews, TextField, Button
```
<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.geometry.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.input.*?>
<?import javafx.scene.layout.*?>

<VBox xmlns="http://javafx.com/javafx/17.0.12" xmlns:fx="http://javafx.com/fxml/1" fx:controller="com.nkkrisz.task.Controller">
   <children>
      <MenuBar>
        <menus>
          <Menu mnemonicParsing="false" text="File">
            <items>
              <MenuItem fx:id="OpenMenuItem" mnemonicParsing="false" onAction="#LoadFile" text="Open">
                     <accelerator>
                        <KeyCodeCombination alt="UP" code="O" control="DOWN" meta="UP" shift="UP" shortcut="UP" />
                     </accelerator></MenuItem>
                  <MenuItem fx:id="CloseMenuItem" mnemonicParsing="false" onAction="#CloseProgram" text="Close" />
            </items>
          </Menu>
          <Menu mnemonicParsing="false" text="Help">
            <items>
              <MenuItem fx:id="AboutMenuItem" mnemonicParsing="false" onAction="#ShowAbout" text="About" />
            </items>
          </Menu>
        </menus>
      </MenuBar>
      <HBox spacing="10.0" VBox.vgrow="ALWAYS">
         <children>
            <ListView fx:id="ExampleListView1" prefHeight="300.0" prefWidth="300.0" HBox.hgrow="ALWAYS" />
            <VBox spacing="10.0" HBox.hgrow="ALWAYS">
               <children>
                  <HBox spacing="10.0">
                     <children>
                        <TextField fx:id="ExampleTextField" HBox.hgrow="ALWAYS" />
                        <Button fx:id="ExampleButton" mnemonicParsing="false" onAction="#Filter" text="Filter" />
                     </children>
                  </HBox>
                  <ListView fx:id="ExampleListView2" prefHeight="250.0" prefWidth="200.0" VBox.vgrow="ALWAYS">
                     <VBox.margin>
                        <Insets />
                     </VBox.margin></ListView>
               </children>
            </VBox>
         </children>
         <padding>
            <Insets bottom="10.0" left="10.0" right="10.0" top="10.0" />
         </padding>
      </HBox>
   </children>
</VBox>
```
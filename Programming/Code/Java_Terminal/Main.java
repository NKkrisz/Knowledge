// Make sure project is named according to the task

package com.nkkrisz;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {

    //Example Class - Snakes
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

    // Complete Tasks Here
    // %d - numbers, %s - strings, %f - floating numbers
    public Main() throws IOException {
        loadFile("kigyok.csv");

        //Task #0 - How many items loaded in + count based on specifics
        int merges = 0;

        for(Kigyo kigyo : kigyok){
            if(kigyo.merges) merges++;
        }

        System.out.printf("0) Osszesen %d kigyo adata beolvasva\nKozuluk %d merges es %d nem merges\n", kigyok.size(), merges, (kigyok.size()-merges));

        //Task #1 - Add together converted specific data with .00 precision

        double osszHossz = 0;
        for(Kigyo kigyo : kigyok){
            osszHossz = osszHossz + kigyo.hossz;
        }

        // .00 precision with %.2f and convert from cm to m
        System.out.printf("1) A kigyok teljes hossza meterben: %.2f\n", osszHossz/100);

        //Task #2 - Biggest of specific data

        //Use first item as starting comparison
        Kigyo leghosszabbMerges = kigyok.getFirst();

        for(Kigyo kigyo : kigyok){
            if(kigyo.merges & kigyo.hossz > leghosszabbMerges.hossz) leghosszabbMerges = kigyo;
        }

        System.out.printf("2) A leghosszabb merges kigyo: %s (%dcm)\n", leghosszabbMerges.fajta, leghosszabbMerges.hossz);

        //Task #3 - Sort specific data type in alphabetical order without duplicates

        ArrayList<String> helyek = new ArrayList<>();
        for (Kigyo kigyo : kigyok){
            if(!helyek.contains(kigyo.elofordulas)) helyek.add(kigyo.elofordulas);
        }

        // Print out arraylist elements with comma separation and no brackets with String.join()
        System.out.printf("3) A kigyok szarmazasi helye (abc): %s\n", String.join(", ", helyek));

        //Task #4 - Choose a random item from the list with a specific data and print out it's details

        //Randomly select item from arraylist with get and random number that is as big as the arraylist
        Kigyo randomMerges = kigyok.get((int) (Math.random()*kigyok.size()));

        //Try randomly until specific data condition is not met
        if(!randomMerges.merges){
            while (!randomMerges.merges){
                randomMerges = kigyok.get((int) (Math.random() * kigyok.size()));
            }
        }

        System.out.printf("4) Egy veletlen kivalasztott merges kigyo: %s\nSzarmazasi helye %s, hossza %dcm\n", randomMerges.fajta, randomMerges.elofordulas, randomMerges.hossz);

        //Task #5 - Categorize items from the arraylist

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
            //Indent with a tab "\t" or use spaces, make new line with "\n"
            System.out.printf("\t%s : %d\n", faj, fajSzamlalo.get(faj));
        }

        //Task #6 - Get last item with specific data

        String utolsoMamba = "";

        for(Kigyo kigyo : kigyok){
            String kigyoFaj = kigyo.fajta.contains(" ") ? kigyo.fajta.split(" ")[1] : kigyo.fajta;
            if(kigyoFaj.equals("Mamba")) utolsoMamba = kigyo.fajta;
        }

        System.out.printf("6) Az utolso Mamba fajtaja: %s\n", utolsoMamba);

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
    }

    public static void main(String[] args) throws IOException {
        new Main();
    }
}
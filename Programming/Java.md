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
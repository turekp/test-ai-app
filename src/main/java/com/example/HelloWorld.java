package com.example;

public class HelloWorld {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Hello World!");
        } else {
            System.out.println("Hello " + args[0] + "!");
        }
    }
}
```

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class HelloWorldTest {
    
    @Test
    public void testHelloWorldWithName() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        HelloWorld.main(new String[]{"Alice"});
        
        System.setOut(System.out);
        assertEquals("Hello Alice!\n", outContent.toString());
    }
    
    @Test
    public void testHelloWorldWithoutName() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        HelloWorld.main(new String[]{});
        
        System.setOut(System.out);
        assertEquals("Hello World!\n", outContent.toString());
    }
    
    @Test
    public void testHelloWorldWithDifferentName() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        HelloWorld.main(new String[]{"Bob"});
        
        System.setOut(System.out);
        assertEquals("Hello Bob!\n", outContent.toString());
    }
}
```

```json
{
  "linear": {
    "identifier": "MED-13",
    "state": "Done"
  }
}
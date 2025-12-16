package com.example;

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
    public void testHelloWorldWithDifferentName() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        HelloWorld.main(new String[]{"Bob"});
        
        System.setOut(System.out);
        assertEquals("Hello Bob!\n", outContent.toString());
    }

    @Test
    public void testHelloWorldWithSpecialCharacters() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        HelloWorld.main(new String[]{"World-123"});
        
        System.setOut(System.out);
        assertEquals("Hello World-123!\n", outContent.toString());
    }

    @Test
    public void testHelloWorldWithNoArguments() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        assertThrows(ArrayIndexOutOfBoundsException.class, () -> {
            HelloWorld.main(new String[]{});
        });
        
        System.setOut(System.out);
    }

    @Test
    public void testHelloWorldWithMultipleArguments() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        
        HelloWorld.main(new String[]{"John", "Doe"});
        
        System.setOut(System.out);
        assertEquals("Hello John!\n", outContent.toString());
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
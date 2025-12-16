package com.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class HelloWorldTest {

    @Test
    public void testHelloWorldWithName() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        try {
            System.setOut(new PrintStream(outContent));
            HelloWorld.main(new String[]{"Alice"});
            assertEquals("Hello Alice!\n", outContent.toString());
        } finally {
            System.setOut(originalOut);
        }
    }

    @Test
    public void testHelloWorldWithDifferentName() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        try {
            System.setOut(new PrintStream(outContent));
            HelloWorld.main(new String[]{"Bob"});
            assertEquals("Hello Bob!\n", outContent.toString());
        } finally {
            System.setOut(originalOut);
        }
    }

    @Test
    public void testHelloWorldWithSpecialCharacters() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        try {
            System.setOut(new PrintStream(outContent));
            HelloWorld.main(new String[]{"World-123"});
            assertEquals("Hello World-123!\n", outContent.toString());
        } finally {
            System.setOut(originalOut);
        }
    }

    @Test
    public void testHelloWorldWithNoArguments() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        try {
            System.setOut(new PrintStream(outContent));
            HelloWorld.main(new String[]{});
            assertEquals("Hello World!\n", outContent.toString());
        } finally {
            System.setOut(originalOut);
        }
    }

    @Test
    public void testHelloWorldWithMultipleArguments() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        try {
            System.setOut(new PrintStream(outContent));
            HelloWorld.main(new String[]{"John", "Doe"});
            assertEquals("Hello John!\n", outContent.toString());
        } finally {
            System.setOut(originalOut);
        }
    }
}

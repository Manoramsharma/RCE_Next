import { ILang } from "@/interface/index"

const code = {
  c: `#include <stdio.h>
  int main() {
      // Write C code here
      printf("Hello world");
  return 0;
  }`,
  cpp: `#include <iostream>
  int main() {
      // Write C++ code here
      std::cout << "Hello world!";
      return 0;
  }`,
  python: `print("Hello world")`,
  py: `print("Hello world")`,
  java: `class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
  javascript: `console.log("Hello, World")`,
  js: `console.log("Hello, World")`,
}
export const boilerplate = (lang: string): string => {
  if (code[lang as keyof ILang]) return code[lang as keyof ILang]
  throw "Boilerplate not available in the specified language"
}

touch compiled.js;
rm compiled.js;
java -jar compiler.jar --js_output_file=compiled.js '../**.js' '!../**.test.js' '!../**compiled.js' --language_in=ECMASCRIPT5

import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";

const Pdf = () => {
    const [pdfDoc, setPdfDoc] = useState(null); 
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFilePicker = async () => {
        try {
            const result = await ExpoDocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
            if (result.type === "success" && result.name.endsWith(".pdf")) {
                setPdfDoc(result);
                setErrorMessage(''); 
            } else {
                setPdfDoc(null); 
                setErrorMessage('Por favor selecciona un archivo PDF válido.');
            }
        } catch (error) {
            console.log("Error al seleccionar el archivo:", error);
            setPdfDoc(null);
            setErrorMessage('Hubo un error al seleccionar el archivo.');
        }
    }

    const handleUpload = async () => {
        if (!pdfDoc || !pdfDoc.uri) {
            setErrorMessage('Por favor selecciona un archivo PDF válido.');
            return;
        }

        try {
            const data = new FormData();
            data.append('question', question);
            data.append('file', pdfDoc);
            
            const response = await fetch('http://10.118.86.237:9004/upload', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                setQuestion('');
                const responseJSON = await response.json();
                setResult(responseJSON.text);
            } else {
                console.log("Error en la respuesta:", response.statusText);
                setErrorMessage('Hubo un error al subir el archivo.');
            }
        } catch (error) {
            console.log("Error al subir el archivo:", error);
            setErrorMessage('Hubo un error al subir el archivo.');
        }
    }

    return (
        <View>
            <Button title={'Select PDF'} onPress={handleFilePicker} />
            {pdfDoc && <Text>Archivo seleccionado: {pdfDoc.name}</Text>}
            <TextInput style={styles.input} value={question} onChangeText={setQuestion}
                placeholder={'Ingresa tu pregunta'} />
            <Button title={'Send'} onPress={handleUpload} />
            <Text>{result}</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    errorMessage: {
        color: 'red',
        marginVertical: 10
    }
});

export default Pdf;

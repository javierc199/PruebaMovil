import React, { useState } from "react";
import { Text, View, Button, TextInput, ActivityIndicator } from "react-native";

const Pdf = () => {
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!question) {
            setErrorMessage('Por favor ingresa una pregunta.');
            return;
        }

        try {
            setLoading(true);
            const data = { sequence: question, candidate_labels: ["Política", "Deportes", "Religión", "Otro"] };
            
            const response = await fetch('http://10.118.82.6:9004/classify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }); 

            if (response.ok) {
                const responseJSON = await response.json();
                setResult(responseJSON.classification);
            } else {
                console.log("Error en la respuesta:", response.statusText);
                setErrorMessage('Hubo un error al clasificar el texto.');
            }
        } catch (error) {
            console.log("Error al clasificar el texto:", error);
            setErrorMessage('Hubo un error al clasificar el texto.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <TextInput style={styles.input} value={question} onChangeText={setQuestion}
                placeholder={'Ingresa el texto a clasificar'} />
            <Button title={'Clasificar'} onPress={handleUpload} />
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            {result && <Text>Resultado de la clasificación: {result}</Text>}
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
    );
}

const styles = {
    input: {
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlignVertical: 'top'
    },
    errorMessage: {
        color: 'red',
        marginTop: 10
    }
};

export default Pdf;

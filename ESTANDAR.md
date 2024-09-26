## 1. Interfaz para añadir API
### Configuración Inicial:

Ingresar la URL de la API a conectar.

Detallar las claves y credenciales necesarias para la autenticación (e.g., API Key, Bearer Token).

### Requisitos de CORS:

La API debe habilitar Cross-Origin Resource Sharing (CORS) para las siguientes IPs:

    52.41.36.82
    54.191.253.12
    44.226.122.3

## 2. Rutas y Endpoints Obligatorios

### Ruta GET (/healthy):

- La API deberá implementar un endpoint GET /healthy para recibir los datos.

- Este endpoint responderá a las solicitudes GET con un JSON que indique los datos y tipos que recibe:

```json
{
    "dato1": "tipo",
}
```
### Ruta POST
- Ruta /healthy en formato JSON o multipart/form-data.

- Debe devolver un JSON con el siguiente formato:

```json
    {
        "resultado": resultado,
        "error": error
    }
```

En caso de error, resultado debe ser null, en caso contrario, error debe ser null.
## 3. Manejo de errores
### Errores HTTP:

- Usar códigos de estado HTTP apropiados (200 OK, 400 Bad Request, 500 Internal Server Error, etc.).

- Incluir detalles del error en el cuerpo de la respuesta en un formato JSON.

## 4. Manejo de archivos
Si se llegara a tener que envíar un archivo, se enviará el buffer del archivo en un form-data de la siguiente manera:

```json
    {
        "file": buffer
    }
```

## 5. Seguridad
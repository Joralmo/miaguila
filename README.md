# Mi Águila

[![](https://img.shields.io/github/workflow/status/Joralmo/miaguila/Build%20docker%20image/master?label=Docker%20Hub)](https://hub.docker.com/r/joralmopro/api_miaguila)
[![](https://img.shields.io/github/workflow/status/Joralmo/miaguila/Push?label=Test)](https://github.com/Joralmo/miaguila/actions?query=workflow%3APush)
[![](https://img.shields.io/github/workflow/status/Joralmo/miaguila/Merge?label=Build)](https://github.com/Joralmo/miaguila/actions?query=workflow%3AMerge)

# Correr el proyecto

# Con docker-compose

```
docker-compose up -d --build
docker exec -it api_miaguila npm run seed
```

# Sin Docker

### Importante antes de correr el proyecto para desarrollo se debe definir ese environment
#### Por consola:
```bash
export NODE_ENV=dev
```

### mongo
#### es necesario tener una instancia de mongo en local o remota, los datos de acceso se deben configurar en _./env/dev_ Ó _./env/prod_ para cada caso 

```
npm i
npm run seed
npm run start
```


### **END POINTS**

1. http://localhost:3000/
2. http://localhost:3000/trips
3. http://localhost:3000/trips/{id}
4. http://localhost:3000/trips/total
5. http://localhost:3000/trips/{city}
6. http://localhost:3000/trips/dynamic-rate

### **PAYLOAD END POINTS**

`End point:` _http://localhost:3000/_

`Method:` **GET**

`Payload:` N/A

---

`End point:` _http://localhost:3000/trips_

`Method:` **GET**

`Payload:` N/A

---

`End point:` _http://localhost:3000/trips_

`Method:` **POST**

`Payload:`

```json
{
    "trip": {
        
    }
}
```

---

`End point:` _http://localhost:3000/trips/{id}_

`Method:` **PUT**

`Payload:`

```json
{
    "trip": {
        
    }
}
```
---

`End point:` _http://localhost:3000/trips/total_

`Method:` **GET**

`Payload:` N/A
---

`End point:` _http://localhost:3000/trips/{city}_

`Method:` **GET**

`Payload:` N/A
---

`End point:` _http://localhost:3000/trips/dynamic-rate_

`Method:` **POST**

`Payload:` 
```json
{
    {
        "lat": 0,
        "lng": 0
    }
}
```
---
### **DOCUMENTACIÓN**

### Una vez ejecutada la aplicación dirigirse a _http://localhost:3000/docs_ para ver la documentación

### **BUILD**

```bash
npm run build
```

### **Test**

```bash
npm run test
```
#### 
```bash
docker exec -it api_miaguila npm run test
```

## Nota Importante: para que los test funcionen de manera correcta se debe haber configurado en los archivos de environment la conexión a la base de datos y haber corrido el seed

### **TROUBLESHOTING**
### 1) _Uncaught Error: listen EADDRINUSE: address already in use :::3000_, En caso de este error revisar que el puerto configurado en el env no esté en uso, en ese caso configurar un puerto diferente, igualmente para test cambiar el puerto en caso de error en el comando _test_ del package.json

Hecho con ❤️ por [JoralmoPro](https://www.linkedin.com/in/joralmopro/)

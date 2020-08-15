# Mi Águila

[![](https://img.shields.io/github/workflow/status/Joralmo/miaguila/Build%20docker%20image/master?label=Docker%20Hub)](https://hub.docker.com/r/joralmopro/api_miaguila)
[![](https://img.shields.io/github/workflow/status/Joralmo/miaguila/Push?label=Test)](https://github.com/Joralmo/miaguila/actions?query=workflow%3APush)
# Con docker-compose

```
docker-compose up -d --build
docker exec -it api_miaguila npm run seed
```

# Sin Docker

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

`Method:` **GET**

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
### **Documentación**

#### Una vez ejecutada la aplicación dirigirse a _http://localhost:3000/docs_ para ver la documentación

### **Test**

```bash
npm run test
```
## Nota Importante: para que los test funcionen de manera correcta se debe haber configurado en los archivos de environment la conexión a la base de datos y haber corrido el seed

Hecho con ❤️ por [JoralmoPro](http://bit.ly/portafolioJp)
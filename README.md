# Proyecto

Sistema de admninistración d eevento de Giras Indómito


## Comenzando

### Instrucciones para comenzar con el proyecto:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.
2. Clona el repositorio del proyecto en tu máquina local:
   ```sh
   git clone https://github.com/nicolas-amestica/app_giras_indomito.git
   ```
3. Navega hasta el directorio donde se encuentra el archivo `docker-compose.yml`.
4. Agregar hosts para acceder a los dominios personalizados de los contenedores

   ruta donde se encuentra el archivo de hosts que se debe editar 
```
   linux/macos: /etc/hosts
   windows: C:\Windows\system32\drivers\etc\hosts
   
   # Agregar
   ##

   # Host Database
   
   #
   
   # localhost is used to configure the loopback interface
   
   # when the system is booting. Do not change this entry.
   
   ##
   
   127.0.0.1 localhost
   255.255.255.255 broadcasthost
   ::1 localhost
   
   # Config Carabineros APP
   127.0.0.1 giras.indomito.dev
   127.0.0.1 giras.indomito.localhost
   127.0.0.1 api.giras.indomito.dev
   127.0.0.1 api.giras.indomito.localhost
   
```
4. Construye y levanta los servicios definidos en el archivo `docker-compose.yml`:
   ```sh
   docker-compose up --build
   ```
5. Accede a la aplicación a través de tu navegador web en la URL especificada en el archivo `docker-compose.yml` o en la
   salida de la consola de Docker.
6. **Volúmenes Generados**:
   - Durante la construcción de los contenedores, se generan volúmenes de Docker que permiten mantener datos
     persistentes entre los reinicios y actualizaciones de los contenedores.
   - Estos volúmenes son creados automáticamente por Docker y se gestionan a través del archivo `docker-compose.yml`.
   - Es importante tener estos volúmenes en cuenta cuando se realicen copias de seguridad o migraciones del sistema, ya
     que contienen datos críticos para el funcionamiento continuo de la aplicación.
   
   **Volume: app_giras_indomito_assets:**
   Este volumen funciona como almacén de objetos, ofreciendo una solución para la persistencia de archivos y datos críticos como imagenes, documentos, etc.
   
   **Volume: app_giras_indomito_database:**
   Este volumen se encargará de mantener la persistencia de los datos agregados a la base de datos

   **Volume: app_giras_indomito_node_modules:**
   Este volumen se utiliza para gestionar las dependencias de Node.js, permitiendo el almacenamiento y la compartición de 
   los módulos instalados en el proyecto. Mantiene la consistencia de las dependencias a través de diferentes entornos y 
   contenedores.


### Inicialización de la Base de Datos

Cuando levanten los servicios con Docker Compose, el contenedor MySQL ejecutará automáticamente el script
`init.sql` que se encuentra en el directorio `database/init.sql`. Esto inicializará la base de datos con las tablas y datos
definidos dentro del archivo.

### Prerrequisitos

## Herramientas y software necesarios

Para poder instalar y ejecutar el proyecto, necesitarás las siguientes herramientas y software configurados en tu
sistema:

1. **Sistema Operativo**:
    - MacOS, Linux, o Windows

2. **Docker**:
    - [Docker](https://www.docker.com/products/docker-desktop) permite empaquetar aplicaciones y sus dependencias en
      contenedores, asegurando la consistencia a lo largo de diferentes entornos.
    - [Docker Compose](https://docs.docker.com/compose/) es una herramienta para definir y ejecutar aplicaciones Docker
      de múltiples contenedores.

3. **Git**:
    - [Git](https://git-scm.com/downloads) es un sistema de control de versiones distribuido que te permite clonar el
      repositorio del proyecto y gestionar el código fuente de manera eficiente.

4. **Navegador Web**:
    - Un navegador web moderno como [Google Chrome](https://www.google.com/chrome/)
      o [Mozilla Firefox](https://www.mozilla.org/firefox/) para acceder y utilizar la aplicación.

5. **IDE/Editor de Texto**:
    - [IntelliJ IDEA](https://www.jetbrains.com/idea/) (recomendado para su amplia funcionalidad y soporte para
      múltiples lenguajes)
    - Otros editores
      como [Visual Studio Code](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/),
      o [Atom](https://atom.io/).

6. **Dependencias específicas del proyecto**:
    - Todas las dependencias del proyecto que se instalarán automáticamente a través del archivo `docker-compose.yml`.

Tener estas herramientas y software configurados en tu sistema te permitirá instalar y ejecutar correctamente el
proyecto de Administración de Viviendas.

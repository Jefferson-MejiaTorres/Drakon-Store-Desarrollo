# Tarea 1 – Investigación sobre Repositorios de Código y Git

## ¿Qué es un repositorio?
Un repositorio es un espacio donde se almacena, organiza y gestiona el código fuente, documentación y recursos de un proyecto. Permite llevar un historial de cambios y facilita la colaboración entre varios desarrolladores.

## ¿Qué es un software de control de versiones?
Es una herramienta que registra los cambios realizados en los archivos de un proyecto a lo largo del tiempo. Permite restaurar versiones anteriores, comparar cambios y trabajar en equipo sin sobrescribir el trabajo de otros. Ejemplo: Git.

## ¿Qué es GIT?
Git es un sistema de control de versiones distribuido, gratuito y de código abierto. Permite gestionar el historial de cambios de un proyecto y facilita la colaboración entre varios desarrolladores.

## Descarga e instalación de GIT
- Se descarga Git desde [https://git-scm.com/](https://git-scm.com/) y se instala en el sistema operativo correspondiente siguiendo el asistente de instalación.

## Comandos bash para crear un repositorio con el proyecto
```bash
git init
git add .
git commit -m "Primer commit: estructura inicial del proyecto"
```

## ¿Qué es GIT remote?
Es una referencia a un repositorio alojado en un servidor externo (por ejemplo, GitHub). Permite sincronizar los cambios locales con el repositorio remoto.

## ¿Qué es GITHUB?
GitHub es una plataforma en la nube para alojar repositorios Git. Facilita la colaboración, revisión de código, gestión de incidencias y despliegue de proyectos.

## ¿Cómo se trabaja en equipos en GITHUB?
- Se crea un repositorio en GitHub.
- Se invita a los colaboradores desde la sección de "Settings" > "Collaborators".
- Cada miembro clona el repositorio y trabaja en su propia rama.
- Se usan Pull Requests para fusionar cambios y revisar el código antes de integrarlo a la rama principal.

## Creación del proyecto en GITHUB e invitación a compañeros
- Se crea el repositorio en GitHub y se invita a los compañeros de equipo como colaboradores.
- Se enlaza el repositorio local con el remoto usando:
  ```bash
  git remote add origin https://github.com/usuario/Drakon-Store.git
  git branch -M main
  git push -u origin main
  ```

## Trabajo en ramas
Cada miembro crea su propia rama para trabajar de forma independiente:
```bash
git checkout -b nombre-de-la-rama
git add .
git commit -m "Descripción de los cambios"
git push origin nombre-de-la-rama
```
Luego, se realizan Pull Requests para fusionar los cambios a la rama principal.

## Informe de evidencias y estructura de carpetas
- El informe de evidencias y los documentos generados se encuentran en la carpeta `Documentación` del repositorio.
- En GitHub se crearon las carpetas requeridas: `Documentación`, `FrontEnd` y `BackEnd`.

---
**Nota:** Las evidencias prácticas, capturas y archivos generados están disponibles en el repositorio y en la carpeta Documentación.

import os

# Ruta de la carpeta que contiene los audios
folder_path = './audio/'

# Obtener todos los archivos en la carpeta
files = os.listdir(folder_path)

# Extensiones de audio permitidas
audio_extensions = ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.wma']

# Filtrar solo los archivos de audio
audios = [f for f in files if os.path.splitext(f)[1].lower() in audio_extensions]

# Crear una lista para el HTML
audio_tags = []

# Procesar y renombrar los archivos de audio
for index, audio in enumerate(audios, start=1):
    file_name, file_extension = os.path.splitext(audio)
    
    # Mantener la extensión original
    new_name = f"cancion{index}{file_extension}"
    new_path = os.path.join(folder_path, new_name)
    old_path = os.path.join(folder_path, audio)

    os.rename(old_path, new_path)
    print(f"Renombrado: {audio} -> {new_name}")

    # Añadir el tag de audio con la ruta correcta
    audio_tags.append(f'    <audio id="song{index}" src="audio/{new_name}"></audio>')

# Crear el archivo HTML con la lista de audios
html_content = "<html>\n<body>\n" + "\n".join(audio_tags) + "\n</body>\n</html>"

# Guardar el archivo HTML
html_path = os.path.join("canciones.html")
with open(html_path, "w", encoding="utf-8") as html_file:
    html_file.write(html_content)

print(f"\nArchivo HTML generado en: {html_path}")

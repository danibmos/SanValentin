import os

# Ruta de la carpeta que contiene las imágenes
folder_path = './img/fotos/'

# Obtener todas las imágenes en la carpeta
files = os.listdir(folder_path)

# Filtro para obtener solo archivos de imagen (puedes añadir más extensiones si es necesario)
image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
images = [f for f in files if os.path.splitext(f)[1].lower() in image_extensions]

# Renombrar las imágenes en el formato especificado
for index, image in enumerate(images, start=1):
    # Obtener la extensión del archivo original
    file_name, file_extension = os.path.splitext(image)
    
    # Si es un GIF, mantener la extensión .gif
    if file_extension.lower() == '.gif':
        new_name = f"imagen{index}.gif"
    else:
        new_name = f"imagen{index}.jpg"  # Convertir las otras imágenes a .jpg
    
    old_path = os.path.join(folder_path, image)
    new_path = os.path.join(folder_path, new_name)
    
    # Renombrar la imagen
    os.rename(old_path, new_path)
    print(f"Renombrado: {image} -> {new_name}") 
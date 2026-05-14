from io import BytesIO

import numpy as np
from PIL import Image

IMG_SIZE = 224

def preprocess_image(file_bytes):

    img = Image.open(BytesIO(file_bytes))

    img = img.convert("RGB")

    img = img.resize((IMG_SIZE, IMG_SIZE))

    img_array = np.asarray(img, dtype=np.float32)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = img_array / 255.0

    return img_array
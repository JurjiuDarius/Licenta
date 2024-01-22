import cv2
import keras
import numpy as np
from app.image_processing.networks.UNET import UNET
from app.image_processing.networks.u2net import U2NET
from app.image_processing.CCA_Analysis import *
import os

TEETH_WEIGHTS_LOCATION = os.environ["TEETH_WEIGHTS_LOCATION"]
MANDIBLE_WEIGHTS_LOCATION = os.environ["MANDIBLE_WEIGHTS_LOCATION"]
teeth_model = UNET()
teeth_model.load_weights(TEETH_WEIGHTS_LOCATION)
mandible_model = UNET()
mandible_model.load_weights(MANDIBLE_WEIGHTS_LOCATION)


def process_image(image, processing_type):
    if processing_type == "dentalSegmentation":
        original_image = image
        image = np.float32(image / 255)
        image = image[:, :, 1]
        image = cv2.resize(image, (512, 512), interpolation=cv2.INTER_LANCZOS4)

        image = np.expand_dims(image, axis=0)
        image = np.expand_dims(image, axis=-1)
        prediction = teeth_model.predict(image)
        prediction = prediction[0, :, :, 0]
        prediction = cv2.resize(
            prediction,
            (original_image.shape[1], original_image.shape[0]),
            interpolation=cv2.INTER_LANCZOS4,
        )
        prediction = (prediction * 255).astype("uint8")
        result, _ = CCA_Analysis(original_image, prediction, 3, 2)

    elif processing_type == "mandibleSegmentation":
        original_image = image
        image = np.float32(image / 255)
        image = image[:, :, 1]
        image = cv2.resize(image, (512, 512), interpolation=cv2.INTER_LANCZOS4)

        image = np.expand_dims(image, axis=0)
        image = np.expand_dims(image, axis=-1)
        prediction = mandible_model.predict(image)
        prediction = prediction[0, :, :, 0]
        prediction = cv2.resize(
            prediction,
            (original_image.shape[1], original_image.shape[0]),
            interpolation=cv2.INTER_LANCZOS4,
        )
        result = (prediction * 255).astype("uint8")

    else:
        return Exception("Invalid processing type")

    return result

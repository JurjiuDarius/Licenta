import json
import cv2
import os

ANNOTATIONS_LOCATION = "../../../data/ExtractedBoundingBoxes/BoundingBoxes/"
IMAGES_LOCATION = "../../../data/Images/"
IMG_WIDTH = 1920.0
IMG_HEIGHT = 1080.0


def to_yolo(box, IMG_WIDTH, IMG_HEIGHT):
    # Calculate the center, width and height of the box
    x_center = (box[0][0] + box[2][0]) / 2.0
    y_center = (box[0][1] + box[2][1]) / 2.0
    width = box[2][0] - box[0][0]
    height = box[2][1] - box[0][1]

    # Normalize the values
    x_center /= IMG_WIDTH
    y_center /= IMG_HEIGHT
    width /= IMG_WIDTH
    height /= IMG_HEIGHT

    return [x_center, y_center, width, height]


def transform_dataset():
    # Get the list of all the images
    all_files = os.listdir(ANNOTATIONS_LOCATION)

    # Transform the data into YOLO format
    for i in range(1, len(all_files) + 1):
        with open(f"yolo_bboxes/{i}.txt", "w") as f:

            with open(
                os.path.join(ANNOTATIONS_LOCATION, f"{i}.json"), "r"
            ) as json_file:
                data = json.load(json_file)
            image = cv2.imread(os.path.join(IMAGES_LOCATION, f"{i}.png"))
            for d in data:
                yolo_data = to_yolo(d, image.shape[0], image.shape[1])
                f.write(f"0 {' '.join([str(a) for a in yolo_data])}\n")


if __name__ == "__main__":
    transform_dataset()

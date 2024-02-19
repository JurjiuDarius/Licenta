import json
import cv2
import os

ANNOTATIONS_LOCATION = "../../../data/ExtractedBoundingBoxes/BoundingBoxes/"
YOLO_LOCATION = (
    "C:\\Users\\dariu\\OneDrive\\Desktop\\Facultate\\Licenta\\data\\YOLO_dataset"
)
IMAGES_LOCATION = "../../../data/Images/"
IMAGE_WIDTH = 1720
IMAGE_HEIGHT = 1280


def to_yolo(box, IMG_WIDTH, IMG_HEIGHT):

    x_coords, y_coords = zip(*box)
    y_center = (max(y_coords) + min(y_coords)) / 2
    x_center = (max(x_coords) + min(x_coords)) / 2
    width = max(x_coords) - min(x_coords)
    height = max(y_coords) - min(y_coords)

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
        if i < 89:
            save_path = os.path.join("labels", "train", f"{i}.txt")
        else:
            save_path = os.path.join("labels", "val", f"{i}.txt")
        with open(save_path, "w") as f:

            with open(
                os.path.join(ANNOTATIONS_LOCATION, f"{i}.json"), "r"
            ) as json_file:
                data = json.load(json_file)

            for d in data:
                yolo_data = to_yolo(d, IMAGE_WIDTH, IMAGE_HEIGHT)

                f.write(f"0 {' '.join([str(a) for a in yolo_data])}\n")


if __name__ == "__main__":
    transform_dataset()

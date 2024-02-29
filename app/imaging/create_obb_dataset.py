import json
import cv2
import os

ANNOTATIONS_LOCATION = "../../../data/ExtractedBoundingBoxes/BoundingBoxes/"
YOLO_LOCATION = (
    "C:\\Users\\dariu\\OneDrive\\Desktop\\Facultate\\Licenta\\data\\OBB_Yolo"
)
IMAGE_WIDTH = 1720
IMAGE_HEIGHT = 1280


def transform_dataset():
    all_files = os.listdir(ANNOTATIONS_LOCATION)

    for i in range(1, len(all_files) + 1):
        if i < 89:
            save_path = os.path.join(YOLO_LOCATION, "labels", "train", f"{i}.txt")
        else:
            save_path = os.path.join(YOLO_LOCATION, "labels", "val", f"{i}.txt")
        with open(save_path, "w") as f:

            with open(
                os.path.join(ANNOTATIONS_LOCATION, f"{i}.json"), "r"
            ) as json_file:
                data = json.load(json_file)

            for d in data:
                # The bounding boxes already have the right absolute values, because they were resized at size(1720, 1280) at extraction
                f.write(f"0 {' '.join([str(point) for point in d])}\n")


if __name__ == "__main__":
    transform_dataset()

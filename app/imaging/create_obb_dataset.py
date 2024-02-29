import json
import cv2
import os

ANNOTATIONS_LOCATION = "../../../data/ExtractedBoundingBoxes/BoundingBoxes/"
YOLO_LOCATION = (
    "C:\\Users\\dariu\\OneDrive\\Desktop\\Facultate\\Licenta\\data\\OBB_Yolo"
)
IMAGE_WIDTH = 1720
IMAGE_HEIGHT = 1280


def extract_normalized_coords(box):
    x1, y1 = box[0]
    x2, y2 = box[1]
    x3, y3 = box[2]
    x4, y4 = box[3]
    x1 = x1 / IMAGE_WIDTH
    x2 = x2 / IMAGE_WIDTH
    x3 = x3 / IMAGE_WIDTH
    x4 = x4 / IMAGE_WIDTH
    y1 = y1 / IMAGE_HEIGHT
    y2 = y2 / IMAGE_HEIGHT
    y3 = y3 / IMAGE_HEIGHT
    y4 = y4 / IMAGE_HEIGHT
    return [x1, y1, x2, y2, x3, y3, x4, y4]


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
                f.write(
                    f"0 {' '.join([str(coord) for coord in extract_normalized_coords(d)])}\n"
                )


if __name__ == "__main__":
    transform_dataset()

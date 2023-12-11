import cv2


def process_image(image, processing_type):
    image_center = (image.shape[1] // 2, image.shape[0] // 2)

    font = cv2.FONT_HERSHEY_SIMPLEX
    text = "Processed with " + processing_type + " algorithm"
    font_scale = 1
    font_color = (255, 255, 255)
    thickness = 2

    text_size, _ = cv2.getTextSize(text, font, font_scale, thickness)

    text_x = image_center[0] - text_size[0] // 2
    text_y = image_center[1] + text_size[1] // 2

    cv2.putText(image, text, (text_x, text_y), font, font_scale, font_color, thickness)

    return image

import unittest
from unittest.mock import patch
from flask import Flask, request
from app.utils.jwt import check_authorization, create_token


class TestCheckAuthorization(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.client = self.app.test_client()

    def test_no_authorization_header(self):
        with self.app.test_request_context():
            response = check_authorization(None)(lambda: "Success")()
            self.assertEqual(response, "Success")

    def test_invalid_token(self):
        with self.app.test_request_context():
            with patch.object(
                request, "headers", {"Authorization": "Bearer invalid_token"}
            ):
                response = check_authorization("role")(lambda: "Success")()
                self.assertEqual(response[1], 401)

    def test_valid_token_wrong_role(self):
        token = create_token(1, "wrong_role")
        with self.app.test_request_context():
            with patch.object(request, "headers", {"Authorization": f"Bearer {token}"}):
                response = check_authorization("correct_role")(lambda: "Success")()
                self.assertEqual(response[1], 401)

    def test_valid_token_correct_role(self):
        token = create_token(1, "correct_role")
        with self.app.test_request_context():
            with patch.object(request, "headers", {"Authorization": f"Bearer {token}"}):
                response = check_authorization("correct_role")(lambda: "Success")()
                self.assertEqual(response, "Success")

    def test_valid_token_role_in_list(self):
        token = create_token(1, "role_in_list")
        with self.app.test_request_context():
            with patch.object(request, "headers", {"Authorization": f"Bearer {token}"}):
                response = check_authorization(["role_in_list", "another_role"])(
                    lambda: "Success"
                )()
                self.assertEqual(response, "Success")

    def test_valid_token_role_not_in_list(self):
        token = create_token(1, "role_not_in_list")
        with self.app.test_request_context():
            with patch.object(request, "headers", {"Authorization": f"Bearer {token}"}):
                response = check_authorization(["role_in_list", "another_role"])(
                    lambda: "Success"
                )()
                self.assertEqual(response[1], 401)


if __name__ == "__main__":
    unittest.main()

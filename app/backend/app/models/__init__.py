from .user import *
from .diagnostic import *
from .clinic import *
from .image import *

admin_fields = {("management-" + cls.__name__): cls for cls in [Patient, Doctor]}


def load_user(user_id):
    return Admin.query.get(user_id)

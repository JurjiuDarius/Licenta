from .user import *
from .diagnostic import *
from .clinic import *


admin_fields = {("management-" + cls.__name__): cls for cls in [Patient, Doctor]}

from datetime import date, datetime, time


def json_serial_date(obj):
    if isinstance(obj, (datetime, date, time)):
        return obj.isoformat()
    raise TypeError("Type %s not of type date" % type(obj))

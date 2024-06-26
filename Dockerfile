FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /code

COPY requirements.txt /code/
RUN pip install -r requirements.txt
RUN pip install channels
# RUN pip install gunicorn
# ENTRYPOINT ["./docker-entrypoint.sh"]
COPY . /code/
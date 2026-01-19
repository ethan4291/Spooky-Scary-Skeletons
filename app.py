from pathlib import Path
from flask import Flask, send_from_directory, render_template_string

app = Flask(__name__, static_folder='static', static_url_path='/static')


@app.route('/')
def index():
	# Serve the existing index.html file from project root
	root = Path(__file__).parent
	return send_from_directory(root, 'index.html')


if __name__ == '__main__':
	# Development server
	app.run(host='127.0.0.1', port=5000, debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS 
import subprocess

app = Flask(__name__)
CORS(app) 

@app.route('/startGame', methods=['POST'])
def start_game():
    data = request.json
    start_url = data['start']
    end_url = data['end']

    result = subprocess.run(["C:\\Users\\bengs\\OneDrive\\Desktop\\WikiWander\\main.exe", start_url, end_url],
                            capture_output=True, text=True)
    
    if result.returncode != 0:
        return jsonify({"error": result.stderr}), 500

    output = result.stdout.splitlines()
    if len(output) >= 6:
        start_url = output[0]
        end_url = output[1]
        BFS_size = output[2]
        BFS_time_s = output[3]
        BFS_time_m = output[4]
        DFS_size = output[5]
        DFS_time_s = output[6]
        DFS_time_m = output[7]
        BFS_path = output[8]

        return jsonify(start=start_url, end=end_url, bfs_s=BFS_size, bfs_t_s=BFS_time_s, bfs_t_m=BFS_time_m, dfs_s=DFS_size, dfs_t_s=DFS_time_s, dfs_t_m=DFS_time_m, bfs_p=BFS_path)
    else:
        return jsonify({"error": "Invalid output format from C++ program"}), 500

if __name__ == '__main__':
    app.run(port=5000)

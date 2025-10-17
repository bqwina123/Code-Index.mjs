import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>📚 Grafik Nilai Ujian Siswa</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
  <style>
    body {
      margin: 0;
      font-family: "Poppins", sans-serif;
      background: linear-gradient(to bottom, #e3f2fd, #f8f9fa);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 20px;
    }

    h1 {
      font-size: 26px;
      margin-bottom: 20px;
      color: #222;
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: 15px;
      color: #333;
      text-decoration: underline;
    }

    .chart-section {
      display: flex;
      justify-content: center;
      gap: 40px;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }

    .chart-container {
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      width: 500px;
      height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    canvas {
      width: 100% !important;
      height: 300px !important;
    }

    footer {
      margin-top: 30px;
      font-size: 14px;
      color: #555;
      text-align: center;
      padding-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>📊 Statistik Nilai Ujian Siswa</h1>

  <!-- Bagian 1 -->
  <div class="section-title">📘 Nilai Akademik Siswa</div>
  <div class="chart-section">
    <div class="chart-container"><canvas id="chart1"></canvas></div>
    <div class="chart-container"><canvas id="chart2"></canvas></div>
  </div>

  <!-- Bagian 2 -->
  <div class="section-title">🎯 Analisis Hasil Ujian</div>
  <div class="chart-section">
    <div class="chart-container"><canvas id="chart3"></canvas></div>
    <div class="chart-container"><canvas id="chart4"></canvas></div>
  </div>

  <footer>🎓 Data Nilai Ujian Interaktif dengan Chart.js</footer>

  <script>
    Chart.register(ChartDataLabels);

    // === Grafik 1: Bar Chart Nilai per Mata Pelajaran ===
    new Chart(document.getElementById("chart1"), {
      type: "bar",
      data: {
        labels: ["B. Indonesia", "Matematika", "IPA", "IPS", "B. Inggris"],
        datasets: [{
          label: "Nilai Ujian",
          data: [85, 78, 90, 88, 80],
          backgroundColor: ["#FF6384","#36A2EB","#4BC0C0","#FFCE56","#9966FF"],
          borderColor: "#333",
          borderWidth: 1.5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "📘 Nilai Ujian per Mata Pelajaran", font: { size: 16 } },
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#000",
            font: { size: 11, weight: "bold" }
          }
        },
        scales: { y: { beginAtZero: true, max: 100 } }
      }
    });

    // === Grafik 2: Line Chart Rata-rata Nilai per Bulan ===
    new Chart(document.getElementById("chart2"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei"],
        datasets: [{
          label: "Rata-rata Nilai",
          data: [75, 80, 83, 86, 88],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54,162,235,0.2)",
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        plugins: {
          title: { display: true, text: "📈 Rata-rata Nilai Ujian per Bulan", font: { size: 16 } },
          datalabels: {
            align: "top",
            color: "#000",
            font: { size: 11 },
            formatter: (value) => value
          }
        },
        scales: { y: { beginAtZero: true, max: 100 } }
      }
    });

    // === Grafik 3: Pie Chart Persentase Kelulusan ===
    new Chart(document.getElementById("chart3"), {
      type: "pie",
      data: {
        labels: ["Lulus", "Tidak Lulus"],
        datasets: [{
          data: [85, 15],
          backgroundColor: ["#4BC0C0","#FF6384"]
        }]
      },
      options: {
        plugins: {
          title: { display: true, text: "🎯 Persentase Kelulusan Ujian", font: { size: 16 } },
          datalabels: {
            color: "#fff",
            font: { size: 11 },
            formatter: (value, ctx) => {
              const sum = ctx.chart.data.datasets[0].data.reduce((a,b)=>a+b,0);
              return ((value/sum)*100).toFixed(1) + "%";
            }
          }
        }
      }
    });

    // === Grafik 4: Doughnut Chart Perbandingan Nilai Antar Kelas ===
    new Chart(document.getElementById("chart4"), {
      type: "doughnut",
      data: {
        labels: ["Kelas X", "Kelas XI", "Kelas XII"],
        datasets: [{
          data: [82, 85, 88],
          backgroundColor: ["#FFCE56","#36A2EB","#9966FF"]
        }]
      },
      options: {
        plugins: {
          title: { display: true, text: "🏫 Nilai Rata-rata Antar Kelas", font: { size: 16 } },
          datalabels: {
            color: "#000",
            font: { size: 11 },
            formatter: (value) => value
          },
          legend: { position: "right" }
        }
      }
    });
  </script>
</body>
</html>
  `);
});

server.listen(3000, () => {
  console.log("✅ Server berjalan di http://localhost:3000");
});

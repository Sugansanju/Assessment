import { Pie } from 'vue-chartjs'

export default ({
  extends:Pie,
  mounted() {
    this.renderChart({
      labels: ['Tamil', 'English', 'Numeric', 'Science'],
      datasets: [
        {
          backgroundColor: [
            'rgba(65, 184, 131, .8)',
            'rgba(228, 102, 81, .8)',
            'rgba(0, 216, 255, .8)',
            'rgba(155, 89, 182, .8)'
          ],
          data: [20, 20, 35, 10]
        }
      ]
    }, { responsive: true, maintainAspectRatio: false })
  }
})

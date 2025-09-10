<script setup>
import { onMounted, ref } from "vue";

const vite_name = import.meta.env.VITE_NAME;
const name = ref(null);
const status = ref(null);
const computer = ref(null);
const tablet = ref(null);
const phone = ref(null);
const text = ref(null);
onMounted(() => {
  if (vite_name) {
    document.title = vite_name + " 活着吗？";
    name.value.textContent = vite_name;
  }
  fetch("/api/get", {
    method: "GET",
  })
    .then(async (response) => {
      const json = await response.json();
      if (response.status === 200) {
        if (json.status) {
          if (json.status === "1") {
            status.value.style.color = "gray";
            status.value.textContent = "似了";
            text.value.textContent =
              "睡似了或其他原因不在线，紧急情况请使用电话联系。";
          } else {
            status.value.style.color = "rgb(16, 128, 0)";
            status.value.textContent = "活着";
            text.value.textContent =
              "目前在线，可以通过任何可用的联系方式联系本人。";
          }
        }
        if (json.devices) {
          if (json.devices.computer) {
            computer.value.style = "";
            computer.value.textContent = json.devices.computer;
          } else {
            computer.value.style.color = "gray";
            computer.value.textContent = "未使用";
          }
          if (json.devices.tablet) {
            tablet.value.style = "";
            tablet.value.textContent = json.devices.tablet;
          } else {
            tablet.value.style.color = "gray";
            tablet.value.textContent = "未使用";
          }
          if (json.devices.phone) {
            phone.value.style = "";
            phone.value.textContent = json.devices.phone;
          } else {
            phone.value.style.color = "gray";
            phone.value.textContent = "未使用";
          }
        }
      }
    })
    .catch(() => {});
});
</script>

<template>
  <div class="container">
    <h1>
      <ruby>
        似
        <rt>sǐ</rt>
        了吗?
      </ruby>
    </h1>
    <h3>
      <i><b ref="name"></b></i> 的状态：<br />
      <a ref="status"></a>
    </h3>
    <div class="devices">
      <div class="card">
        <font-awesome-icon :icon="['fas', 'laptop']" size="2x" />
        电脑
        <p ref="computer"></p>
      </div>
      <div class="card">
        <font-awesome-icon :icon="['fas', 'tablet-screen-button']" size="2x" />
        平板
        <p ref="tablet"></p>
      </div>
      <div class="card">
        <font-awesome-icon :icon="['fas', 'mobile-screen-button']" size="2x" />
        手机
        <p ref="phone"></p>
      </div>
    </div>
    <p ref="text" class="text"></p>
  </div>
</template>

<style scoped>
.container {
  width: 50%;
  height: 50%;
  color: var(--color-text);
  text-align: center;
  font-size: 1.1em;
  padding: 2rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: scroll;
  background-color: var(--color-background);
  text-shadow: 0 1px 2px var(--color-background-soft);
  box-shadow: 0 8px 32px var(--color-background-soft);
}

.container:hover {
  transition: all 0.3s;
  transform: translateY(-5px);
  border: 1px solid var(--color-border-hover);
  box-shadow: 0 16px 64px var(--color-background-soft);
}

.devices {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.card {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background-color: var(--color-background-soft);
  text-shadow: 0 1px 2px var(--color-background-mute);
  box-shadow: 0 4px 16px var(--color-background-mute);
}

.card:hover {
  transition: all 0.3s;
  transform: translateY(-5px);
  border: 1px solid var(--color-border-hover);
  box-shadow: 0 8px 32px var(--color-background-mute);
}

.card p {
  width: 100%;
  text-overflow: ellipsis;
}

.text {
  font-size: 1.1em;
  margin: 1rem;
}
</style>

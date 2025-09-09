<script setup>
fetch("/api/get", {
  method: "GET",
})
  .then((response) => {
    const json = response.json();
    const status = json.status;
    const device = json.device;
    if (response.status === 200) {
      if (!status === "" || !status === void 0) {
        document.getElementById("status").innerHTML = status;
      }
      if (!device === "" || !device === void 0) {
        document.getElementById("device").innerHTML = device;
      }
    }
  })
  .catch(() => {});
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
      <i><b>小源151</b></i> 的状态：<br />
      <a style="color: rgb(16, 128, 0)" id="status">活着</a>
    </h3>
    <p>目前在线，可以通过任何可用的联系方式联系本人。</p>
    <p id="device"></p>
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

.container p {
  font-size: 1.1em;
  margin: 1rem;
}
</style>

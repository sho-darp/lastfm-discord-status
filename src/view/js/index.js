(() => {
  document.getElementById("hello").addEventListener("click", async () => {
    const res = await window.api.Sample("Hello");
    alert(res);
  });
})();

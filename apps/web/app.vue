<template>
  <main class="shell">
    <section class="hero">
      <p class="eyebrow">COWORKSPACE</p>
      <h1>Reserve um espaço que acompanha seu trabalho.</h1>
      <p class="subtitle">Salas, mesas e ambientes profissionais em um só lugar.</p>
      <div class="actions">
        <NuxtLink to="/login" class="primary">Entrar</NuxtLink>
        <NuxtLink to="/register" class="secondary">Criar conta</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #10131a; color: #f5f7fb; }
.shell { min-height: 100vh; display: grid; place-items: center; padding: 2rem; background: radial-gradient(circle at 70% 20%, #263d68 0, transparent 38%), #10131a; }
.hero { max-width: 760px; }
.eyebrow { letter-spacing: .25em; color: #76a9ff; font-weight: 700; }
h1 { font-size: clamp(2.8rem, 7vw, 6rem); line-height: .98; margin: 1rem 0; }
.subtitle { color: #aab4c7; font-size: 1.25rem; }
.actions { display: flex; gap: 1rem; margin-top: 2rem; }
.actions a { padding: .85rem 1.2rem; border-radius: .7rem; text-decoration: none; font-weight: 700; }
.primary { background: #76a9ff; color: #10131a; }
.secondary { border: 1px solid #52617a; color: #f5f7fb; }
</style>

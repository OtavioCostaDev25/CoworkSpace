<script setup lang="ts">
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const api = useApi();

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    const result = await api<{ accessToken: string }>('/auth/login', { method: 'POST', body: { email: email.value, password: password.value } });
    localStorage.setItem('coworkspace_token', result.accessToken);
    await navigateTo('/dashboard');
  } catch {
    error.value = 'Não foi possível entrar. Confira suas credenciais.';
  } finally { loading.value = false; }
}
</script>

<template>
  <main class="auth-page">
    <form class="card" @submit.prevent="submit">
      <NuxtLink to="/" class="back">← CoworkSpace</NuxtLink>
      <h1>Bem-vindo de volta</h1>
      <p>Entre para gerenciar suas reservas.</p>
      <label>E-mail<input v-model="email" type="email" required autocomplete="email"></label>
      <label>Senha<input v-model="password" type="password" required autocomplete="current-password"></label>
      <p v-if="error" class="error">{{ error }}</p>
      <button :disabled="loading" type="submit">{{ loading ? 'Entrando...' : 'Entrar' }}</button>
      <span>Não tem conta? <NuxtLink to="/register">Cadastre-se</NuxtLink></span>
    </form>
  </main>
</template>

<style scoped>
.auth-page { min-height:100vh; display:grid; place-items:center; padding:1rem; background:#10131a; color:#f5f7fb; }
.card { width:min(100%,420px); display:grid; gap:1rem; padding:2rem; border:1px solid #2f3a50; border-radius:1rem; background:#171c26; }
h1 { margin:0; } .card p { color:#aab4c7; } .back,.card a { color:#76a9ff; text-decoration:none; }
label { display:grid; gap:.4rem; color:#c8d0df; } input { padding:.8rem; border:1px solid #52617a; border-radius:.5rem; background:#10131a; color:#fff; }
button { padding:.85rem; border:0; border-radius:.5rem; background:#76a9ff; font-weight:700; cursor:pointer; } button:disabled { opacity:.6; }
.error { color:#ff8d8d !important; margin:0; }
</style>

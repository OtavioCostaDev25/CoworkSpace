<script setup lang="ts">
const name = ref(''); const email = ref(''); const password = ref(''); const error = ref(''); const loading = ref(false); const api = useApi();
async function submit() {
  loading.value = true; error.value = '';
  try { await api('/auth/register', { method:'POST', body:{ name:name.value, email:email.value, password:password.value } }); await navigateTo('/login'); }
  catch { error.value = 'Não foi possível criar a conta.'; } finally { loading.value = false; }
}
</script>
<template>
  <main class="auth-page"><form class="card" @submit.prevent="submit">
    <NuxtLink to="/" class="back">← CoworkSpace</NuxtLink><h1>Crie sua conta</h1><p>Comece a reservar espaços profissionais.</p>
    <label>Nome<input v-model="name" required></label><label>E-mail<input v-model="email" type="email" required></label><label>Senha<input v-model="password" type="password" minlength="8" required></label>
    <p v-if="error" class="error">{{ error }}</p><button :disabled="loading" type="submit">{{ loading ? 'Criando...' : 'Criar conta' }}</button><span>Já tem conta? <NuxtLink to="/login">Entrar</NuxtLink></span>
  </form></main>
</template>
<style scoped>
.auth-page{min-height:100vh;display:grid;place-items:center;padding:1rem;background:#10131a;color:#f5f7fb}.card{width:min(100%,420px);display:grid;gap:1rem;padding:2rem;border:1px solid #2f3a50;border-radius:1rem;background:#171c26}h1{margin:0}.card p{color:#aab4c7}.back,.card a{color:#76a9ff;text-decoration:none}label{display:grid;gap:.4rem;color:#c8d0df}input{padding:.8rem;border:1px solid #52617a;border-radius:.5rem;background:#10131a;color:#fff}button{padding:.85rem;border:0;border-radius:.5rem;background:#76a9ff;font-weight:700}button:disabled{opacity:.6}.error{color:#ff8d8d!important;margin:0}
</style>

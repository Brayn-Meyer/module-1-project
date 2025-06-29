<template>
  <div class="wrapper">
    <form @submit.prevent="handleLogin">
      <div class="imgcontainer">
        <img src="@/assets/modernTech.png" alt="logo" class="logo">
        <h1>Welcome To ModernTech Solutions</h1>
      </div>

      <div class="container">
        <label for="uname"><b>Username:</b></label>
        <input type="text" v-model="username" placeholder="Enter Username" name="uname" required>

        <label for="psw"><b>Password:</b></label>
        <input type="password" v-model="password" placeholder="Enter Password" name="psw" required>

        <button type="submit">Login</button><br>
        <label>
          <input type="checkbox" v-model="remember" name="remember"> Remember me
        </label>
        <h4>ModernTech / Solutions</h4>
        <div v-if="error" class="error-msg">{{ error }}</div>
      </div>

      <div class="container bottom-container">
        <button type="button" class="cancelbtn" @click="resetForm">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      remember: true,
      error: ''
    };
  },
  methods: {
    handleLogin() {
      // Set your required credentials here
      const requiredUsername = 'ModernTech';
      const requiredPassword = 'Solutions';

      if (this.username === requiredUsername && this.password === requiredPassword) {
        // Successful login: redirect or emit event
        this.error = '';
        // Example: this.$router.push('/dashboard');
        window.location.href = '/dashboard';
      } else {
        this.error = 'Incorrect username or password.';
      }
    },
    resetForm() {
      this.username = '';
      this.password = '';
      this.error = '';
    }
  }
};
</script>
<style scoped>
body {
    background: linear-gradient(135deg, #8da9c4 0%, #f5efeb 100%);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
}

.wrapper {
    width: 400px;
    margin: 40px auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(11, 37, 69, 0.08);
    overflow: hidden;
    padding-bottom: 1rem;
}
form {
    border: none;
}


input[type="text"], input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #8da9c4;
    box-sizing: border-box;
    border-radius: 6px;
    background: #f5efeb;
    font-size: 1rem;
    color: #0b2545;
}

input[type="text"]:focus, input[type="password"]:focus {
    border-color: #0b2545;
    outline: none;
    background: #fff;
}


button {
    background: linear-gradient(135deg, #0b2545, #8da9c4);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 50%;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    transition: background 0.3s, transform 0.2s;
}

button:hover {
    background: #364fc7;
    transform: translateY(-2px);
    opacity: 0.95;
}


.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #ff2200;
}

.imgcontainer {
    text-align: center;
    margin-top: 2rem;
}


.logo {
    width: 180px;
    height: auto;
    margin-bottom: 1rem;
}


.container {
    padding: 24px;
}

h1 {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    color: #0b2545;
    margin-bottom: 1rem;
    font-size: 2rem;
    text-shadow: 1px 1px 2px rgba(141, 169, 196, 0.2);
}

.bottom-container {
    background-color: #e0e8ee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 0 0 12px 12px;
}

input[type="checkbox"] {
    accent-color: #0b2545;
}


span.psw {
    float: right;
    padding-top: 16px;
    color: #0b2545;
    font-size: 0.95rem;
}


@media screen and (max-width: 500px) {
    .wrapper {
        width: 95%;
        margin: 20px auto;
        padding-bottom: 0.5rem;
    }
    .container {
        padding: 12px;
    }
    .logo {
        width: 120px;
    }
    h1 {
        font-size: 1.3rem;
    }
    .bottom-container {
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }
    button, .cancelbtn {
        width: 100%;
    }
    span.psw {
        float: none;
        padding-top: 8px;
        text-align: center;
        display: block;
    }
}
</style>
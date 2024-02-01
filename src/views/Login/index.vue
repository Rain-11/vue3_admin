<script setup lang="ts" name="Login">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import userStore from "@/store/modules/user.ts";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import getTime from "@/utils/getTime.ts";
import { LoginForm } from "@/views/Login/type.ts";
import { staticRout } from "@/routers/StaticRout.ts";

let loginForm = reactive<LoginForm>({
  username: "admin",
  password: "111111",
});

const ruleFormRef = ref<FormInstance>();
/*{ required: true, message: '请填写用户名', trigger: 'blur' },
{ min: 5, max: 5, message: '用户名长度为5位', trigger: 'blur' },*/
const rules = reactive<FormRules<LoginForm>>({
  username: [
    {
      validator(_, value, callback) {
        if (/^\w{5}$/.test(value)) {
          callback();
        } else {
          callback(new Error("用户名为字母下划线数字，最多五位"));
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请填写密码", trigger: "blur" },
    { min: 10, max: 10, message: "密码长度为10位", trigger: "blur" },
  ],
});
const userData = userStore();
const router = useRouter();
let loading = ref(false);
const route = useRoute();
let login = async () => {
  try {
    await ruleFormRef.value?.validate();
    loading.value = true;
    await userData.loginActions(loginForm);
    userData.userRoute = staticRout;
    ElNotification({
      type: "success",
      message: "登录成功",
      title: `Hi,${getTime()}`,
    });
    loading.value = false;
    if (route.query.redirect) {
      await router.push({ path: route.query.redirect as string });
    } else {
      await router.push({ path: "/" });
    }
  } catch (e) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: e as string,
    });
  }
};
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :xs="0" :span="12"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="ruleFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btn"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    padding: 60px;
    width: 60%;
    position: relative;
    top: 30vh;
    background-image: url("@/assets/images/login_form.png");

    h1 {
      font-size: 40px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      text-align: center;
      margin: 20px 0;
    }

    .btn {
      width: 100%;
    }
  }
}
</style>

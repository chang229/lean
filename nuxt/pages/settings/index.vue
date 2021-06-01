<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>
                    <ul class="error-messages" v-if="errMsg">
                        <li>{{ errMsg }}</li>
                    </ul>
					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
                                    v-model="user.image"
                                    :disabled="submmit"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name" 
                                    v-model="user.username"
                                    :disabled="submmit"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
                                    v-model="user.bo"
                                    :disabled="submmit"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Email" 
                                    v-model="user.email"
                                    :disabled="submmit"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="new Password"
                                    v-model="password"
                                    :disabled="submmit"
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								@click.prevent="replaceUser"
                                :disabled="submmit"
							>
								Update Settings
							</button>
						</fieldset>
					</form>
					<hr />
					<button class="btn btn-outline-danger" @click="loginOut">
						Or click here to logout.
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex';
import { updateUser } from '@/utils/api.js';
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
	middleware: 'authenticated',
	name: 'settings',
	asyncData({ store }) {
		return {
			user: store.state.user,
		};
	},
    data(){
        return {
            password:'',//密码
            submmit:false,//是否在提交
            errMsg:'',
        }
    },
	methods: {
		...mapMutations(['setUser']),
        // 退出登录
		loginOut() {
			this.setUser(null);
			Cookie.remove('user');
			this.$router.replace('/');
		},
        // 更新个人信息
        replaceUser(){
            this.submmit = true;
            let { bio,email,image,username } = this.user;
            let userInfo = {
                bio,
                email,
                image,
                username,
            };
            if(this.password){
                userInfo.password = this.password
            }
            updateUser({
                user:{...userInfo}
            }).then((res) => {
                this.setUser(res.user);
                Cookie.set('user', res.user);
                this.submmit = false;
                this.$router.push(`/profile/${res.user.username}`)
            }).catch((e) => {
                this.errMsg = e;
                this.submmit = false;
            })
        }
	},
};
</script>

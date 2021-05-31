<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>
					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Email"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								@click.prevent="updateUser"
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
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
	middleware: 'authenticated',
	name: 'settings',
	asyncDate({ store }) {
		return {
			user: store.state.user,
		};
	},
	methods: {
		...mapMutations(['setUser']),
		loginOut() {
			this.setUser(null);
			Cookie.remove('user');
			this.$router.replace('/');
		},
	},
};
</script>

<template>
	<div class="s-wrapper">
		<notifications position="top right" />
		<nav>
			<div class="container">
				<div class="s-brand">SMAP Energy</div>
				<ul>
					<li><router-link to="/">Home</router-link></li>
					<li><router-link to="/consumers">Consumers</router-link></li>
				</ul>
			</div>
		</nav>
		<div class="s-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import Consumers from './Consumers';
	export default {
		name: 'App',
		components: {
			Consumers
		}
  }
</script>
<style lang="scss">
	.s-wrapper {
		width: 100%;
	}
	.s-content {
		margin-top: 4rem;
		height: calc(100vh - 4rem);
		overflow-y: auto;
	}
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		widows: 100%;
		z-index: 2;
		height: 4rem;
		box-shadow: 0 4px 10px 0 rgba(0,0,0,.2);
		background-color: #1F4278;

		.container {
			display: flex;
			align-items: center;
			height: 100%;
		}
		.s-brand {
			color: #FFF;
			font-weight: 500;
			font-size: 1.5rem;
			margin-right: .75rem;
		}
		ul {
			display: flex;
			height: 100%;
			li {
				height: 100%;
				a {
					height: 100%;
					padding: 0 1rem;
					color: #eee;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: transparent;
					transition: background-color .2s ease;
					&:hover {
						background-color: rgba(0,0,0,.1);
						transition: background-color .2s ease;
						color: #fff;
						text-decoration: none;
					}
				}
				.router-link-exact-active {
					background-color: rgba(0,0,0,.2);
				}
			}
		}
	}
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.notifications {
		top: 20px !important;
		right: 20px !important;
	}
</style>

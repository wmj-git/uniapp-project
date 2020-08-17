<template>
	<view>
		<web-view :src='src'> </web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				news_id: ""
			}
		},
		onLoad: async function(option) {
			this.news_id = option.news_id;
			const res = await this.$myRequset({
				url: "/api",
				method: "POST",
				data: {
					operate: "News.get_link",
					news_id: this.news_id
				},
				header: {
					'content-type': 'application/form'
				}
			});
			this.src = res.data.data.link;
		}
	}
</script>

<style>
</style>

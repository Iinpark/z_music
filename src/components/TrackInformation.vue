<template>
	<main class="track-information" v-if="false">
		<div class="information">
		
			<div class="current-track current-track_left">
				<p class="current-track__header">
					now playing
				</p>
				<h2 class="current-track__name">
					{{nameOfTrack}}
				</h2>
			</div>

			<div class="current-track current-track_right">
				<p class="current-track__header">
					next song
				</p>
				<h2 class="current-track__name">
					{{nameOfNextTrack}}
				</h2>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	props: {
		nameOfTrack: {
			type: String,
			default: 'Name of track is left in undefined'
		},
		nameOfNextTrack : {
			type: String,
			default: 'Name of next track is left in undefined'
		}
	},
}
</script>

<style lang="scss">
	.track-information {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		height: 100vh;
		width: 100vw; 
		
		position: fixed;
		top: 0;
		left: 0;
		
		display: flex;
		align-items: flex-end;

		background-image: url(https://source.unsplash.com/random/1920x1080/?space);
		background-size: cover;
	}
	.information {
		display: flex;
		justify-content: space-between;
		flex: 1;

		margin-bottom: 8em;
		padding: 1em 4em 1em;
		backdrop-filter: blur(2px);
	}
	.current-track {
		text-transform: uppercase;
		color: white;
		overflow: hidden;
		width: 30%;

		&__name {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		$horizontal-line-heigth: .1rem;
		&_left::before {
			content: '';
			display: block;
			height: $horizontal-line-heigth;
			background: rgb(255,255,255);
			background: linear-gradient(90deg, rgba(255,255,255,1) 46%, rgba(255,255,255,0) 100%);
		}
		&_right::before {
			content: '';
			display: block;
			height: $horizontal-line-heigth;
			background: rgb(255,255,255);
				background: linear-gradient(270deg, rgba(255,255,255,1) 46%, rgba(255,255,255,0) 100%);
		}

	}
</style>
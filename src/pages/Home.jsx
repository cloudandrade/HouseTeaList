import { useEffect } from 'react';
import '../App.css';
import { Typography, CircularProgress } from '@material-ui/core';
import Lista from '../components/Accordion';
import { useAppContent } from '../context/AppContentContext';

export default function Home() {
	const { content, loading } = useAppContent();
	const { theme } = content;

	useEffect(() => {
		if (content?.documentTitle) {
			document.title = content.documentTitle;
		}
	}, [content?.documentTitle]);

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '50vh',
				}}
			>
				<CircularProgress style={{ color: theme.primary }} />
			</div>
		);
	}

	return (
		<div className="App">
			<div className="box1">
				<Typography
					color="primary"
					style={{
						fontFamily: 'Alex Brush',
						fontSize: '38px',
						fontWeight: 'bold',
					}}
				>
					{content.heroTitle}
				</Typography>
			</div>
			<div className="box1">
				<div className="child1">
					<img
						src={content.heroImage}
						className="img"
						alt=""
					/>
				</div>
			</div>
			<div className="box1">
				<Typography
					color="primary"
					style={{
						fontFamily: 'Alex Brush',
						fontSize: '32px',
						fontWeight: 'bold',
					}}
				>
					{content.listSubtitle}
				</Typography>
			</div>

			<div className="box3">
				<Typography
					style={{
						margin: '15px',
						fontFamily: 'Roboto',
						fontSize: '16px',
						fontWeight: '600',
						color: theme.text,
					}}
				>
					{content.introPrimary}
				</Typography>
				<Typography
					style={{
						margin: '12px',
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
						color: theme.text,
					}}
				>
					{content.introNote}
				</Typography>
				<Typography
					style={{
						margin: '12px',
						marginTop: -10,
						fontFamily: 'Roboto',
						fontSize: '12px',
						fontWeight: '600',
						color: theme.text,
					}}
				>
					{content.introShipping}
				</Typography>
			</div>
			<Lista />
		</div>
	);
}

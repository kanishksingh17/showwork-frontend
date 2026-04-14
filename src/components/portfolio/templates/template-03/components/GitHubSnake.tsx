export default function GitHubSnake() {
    // We prioritize the animated snake as it provides the 'wowed' experience
    return (
        <div className="w-full overflow-hidden">
            <div className='dark:hidden'>
                <img
                    src="/github-contribution-snake/github-contribution-grid-snake.svg"
                    alt="github-contribution-animation"
                    className="w-full h-auto"
                />
            </div>
            <div className='hidden dark:block'>
                <img
                    src="/github-contribution-snake/github-contribution-grid-snake-dark.svg"
                    alt="github-contribution-animation"
                    className="w-full h-auto"
                />
            </div>
        </div>
    )
}

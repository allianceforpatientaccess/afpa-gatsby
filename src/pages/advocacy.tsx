import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const AdvocacyPage = ({ data }) => {
	const page = data.wordpressPage
	const legFields = data.allWordpressWpLegislativeAdvocacy.edges
	const regFields = data.allWordpressWpRegulatoryAdvocacy.edges

	const fedIssues: any[] = []
	const fedIssueArr: string[] = [] // iterable for JSX map function
	const stateIssues: any[] = []
	const stateIssueArr: string[] = [] // iterable for JSX map function

	// sort each legislative effort for display
	// TODO?: wonder if this can be reduced to a single call to reduce...
	legFields.forEach(el => {
		el = el.node

		if (el.categories[0].slug === 'federal') {
			if (fedIssues[el.tags[0].name] === undefined)
				fedIssues[el.tags[0].name] = []
			fedIssues[el.tags[0].name].push(el)
		} else {
			if (stateIssues[el.tags[0].name] === undefined)
				stateIssues[el.tags[0].name] = []
			stateIssues[el.tags[0].name].push(el)
		}
	})
	for (const key in fedIssues) fedIssueArr.push(key)
	for (const key in stateIssues) stateIssueArr.push(key)

	return (
		<Layout>
			<SEO title="Advocacy" />
			<Img
				imgStyle={{ objectPosition: 'top' }}
				fluid={page.featured_media.localFile.childImageSharp.fluid}
			/>

			<div className="mx-2 lg:mx-32 xl:mx-64 mt-10 pb-64">
				<header className="mb-12">
					<h4>Take Action</h4>
					<p
						className="content"
						dangerouslySetInnerHTML={{ __html: page.acf.header_text }}
					/>
				</header>

				<section>
					{/* Federal */}
					<div className="flex flex-wrap justify-center md:justify-end">
						<div className="w-1/2 mb-4 md:mb-0 md:w-1/4 pr-5">
							<Img fluid={data.imgLegislative.childImageSharp.fluid} />
						</div>
						<div className="w-3/4">
							<div className="flex items-center">
								<p className="mr-4 text-textGreen font-medium">FEDERAL</p>
								<div className="h-2px w-full bg-textGreen" />
							</div>

							<div className="flex items-start">
								{fedIssueArr.map(el => (
									<div key={el} className="md:w-5/12 mt-4">
										<h5>{el}</h5>
										<div className="h-px w-full bg-backgroundGray" />
										{fedIssues[el].map((issue: any) => (
											<div key={issue.id} className="my-3">
												<p dangerouslySetInnerHTML={{ __html: issue.title }} />
												<div className="flex justify-between">
													{issue.acf.link_1 ? (
														<a
															href={issue.acf.link_1}
															className="text-sm text-lightBlue"
														>
															{issue.acf.link_1_text}
														</a>
													) : null}
													{issue.acf.link_2 ? (
														<a
															href={issue.acf.link_2}
															className="text-sm text-lightBlue"
														>
															{issue.acf.link_2_text}
														</a>
													) : null}
												</div>
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* State */}
					<div className="mt-10 flex justify-center md:justify-end">
						<div className="w-3/4">
							<div className="flex items-center">
								<p className="mr-4 text-textGreen font-medium">STATE</p>
								<div className="h-2px w-full bg-textGreen" />
							</div>

							<div className="flex flex-wrap items-start justify-between">
								{stateIssueArr.map(el => (
									<div key={el} className="md:w-5/12 mt-4">
										<h5>{el}</h5>
										<div className="h-px w-full bg-backgroundGray" />
										{stateIssues[el].map((issue: any) => (
											<div key={issue.id} className="my-5">
												<p dangerouslySetInnerHTML={{ __html: issue.title }} />
												<div className="flex justify-between">
													{issue.acf.link_1 ? (
														<a
															href={issue.acf.link_1}
															className="text-sm text-lightBlue"
														>
															{issue.acf.link_1_text}
														</a>
													) : null}
													{issue.acf.link_2 ? (
														<a
															href={issue.acf.link_2}
															className="text-sm text-lightBlue"
														>
															{issue.acf.link_2_text}
														</a>
													) : null}
												</div>
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="mt-10 flex flex-wrap justify-center md:justify-end">
					<div className="w-1/2 mb-4 md:mb-0 md:w-1/4 pr-5">
						<Img fluid={data.imgRegulatory.childImageSharp.fluid} />
					</div>

					<div className="w-3/4">
						<div
							className="content mb-5"
							dangerouslySetInnerHTML={{ __html: page.acf.regulatory_text }}
						/>
						{regFields.map(el => {
							el = el.node
							return (
								<p key={el.id} className="my-2 text-lightBlue text-sm">
									<a href={el.title}>{el.title}</a>
								</p>
							)
						})}
					</div>
				</section>
			</div>
		</Layout>
	)
}

export const pageQuery = graphql`
	query LegislativeAdvocacy {
		allWordpressWpLegislativeAdvocacy {
			edges {
				node {
					id
					title
					tags {
						name
						slug
					}
					categories {
						name
						slug
					}
					acf {
						link_1
						link_1_text
						link_2
					}
				}
			}
		}
		allWordpressWpRegulatoryAdvocacy {
			edges {
				node {
					id
					title
					acf {
						link
					}
				}
			}
		}
		wordpressPage(slug: { eq: "advocacy" }) {
			acf {
				header_text
				regulatory_text
			}
			featured_media {
				localFile {
					childImageSharp {
						fluid(maxWidth: 1920) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
		imgLegislative: file(relativePath: { eq: "afpa-legislative.png" }) {
			childImageSharp {
				fluid(maxWidth: 350) {
					...GatsbyImageSharpFluid
				}
			}
		}
		imgRegulatory: file(relativePath: { eq: "afpa-regulatory.png" }) {
			childImageSharp {
				fluid(maxWidth: 350) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`

export default AdvocacyPage

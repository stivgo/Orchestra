import express from 'express'

const ElementRoutes = require('./ElementRoutes')
const OrganizationRoutes = require('./OrganizationRoutes')
const PageRoutes = require('./PageRoutes')
const ProjectRoutes = require('./ProjectRoutes')
const SectionRoutes = require('./SectionRoutes')
const UserRoutes = require('./UserRoutes')
const AuthenticationRoutes = require('./AuthenticationRoutes')
const CollaboratorsRoutes = require('./CollaboratorRoutes')
const ResourceRoutes = require('./ResourceRoutes')
const CustomComponentTemplateRoutes = require('./CustomComponentTemplateRoutes')
const TemplateRoutes = require('./TemplateRoutes')
const TimelineRoutes = require('./TimelineRoutes')

const app = express()

app.use(AuthenticationRoutes)
app.use(ElementRoutes)
app.use(PageRoutes)
app.use(SectionRoutes)
app.use(ProjectRoutes)
app.use(UserRoutes)
app.use(OrganizationRoutes)
app.use(CollaboratorsRoutes)
app.use(ResourceRoutes)
app.use(CustomComponentTemplateRoutes)
app.use(TemplateRoutes)
app.use(TimelineRoutes)

module.exports = app
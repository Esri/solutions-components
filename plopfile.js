module.exports = function (plop) {
  plop.setGenerator('generate', {
    description: 'combines the other generators: generates a storybook story & harness file',

    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name'
    }],

    actions: function (data) {
      const storyActions = plop.getGenerator('story').actions.call(this, data);
      const harnessActions = plop.getGenerator('harness').actions.call(this, data);

      return [
        ...storyActions,
        ...harnessActions
      ]
    }
  });

  plop.setGenerator('story', {
    description: 'generates a storybook story',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],

    actions: function (data) {
      const uppercasedName = data.name.split('-').map(part => {
        return part.substr(0, 1).toUpperCase() + part.substr(1).toLowerCase()
      }).join('');

      return [
        {
          type: 'add',
          path: 'src/components/{{name}}/{{name}}.stories.tsx',
          templateFile: 'plop-templates/story.hbs',
          data: {
            uppercasedName
          }
        }
      ]
    }
  });

  plop.setGenerator('harness', {
    description: 'generates a component harness file',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],

    actions: function (data) {
      return [
        {
          type: 'add',
          path: 'src/html/{{name}}/index.html',
          templateFile: 'plop-templates/harness.html'
        },
        {
          type: 'modify',
          path: 'src/index.html',
          pattern: /<\/calcite-dropdown-group>/,
          template:`  <calcite-dropdown-item href="./html/{{name}}/index.html">{{name}}</calcite-dropdown-item>
        </calcite-dropdown-group>`
        }
      ]
    }
  })
};

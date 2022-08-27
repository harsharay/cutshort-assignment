const initialState = {
    currentPageIndex: 0,
    allPagesData: [
        {
            heading: 'Welcome! First things first...',
            subHeading: 'You can always change later.',
            inputData: [
                {
                    label: 'Full Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Steve Jobs',
                    name: 'fullName',
                },
                {
                    label: 'Display Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Steve',
                    name: 'displayName',
                },
            ],
            buttonText: 'Create Workspace',
        },
        {
            heading: "Let's set up a home fo all your work",
            subHeading: 'You can always create another workspace later.',
            inputData: [
                {
                    label: 'Workspace Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Eden',
                    name: 'workspaceName',
                },
                {
                    label: 'Workspace URL',
                    mandatory: true,
                    type: 'text',
                    placeholder: 'Example',
                    name: 'workspaceUrl',
                },
            ],
            buttonText: 'Create Workspace',
        },
        {
            heading: "Let's go",
            subHeading: 'You can always create another workspace later.',
            inputData: [
                {
                    label: 'Workspace Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Eden',
                    name: 'workspaceName',
                },
                {
                    label: 'Workspace URL',
                    mandatory: true,
                    type: 'text',
                    placeholder: 'Example',
                    name: 'workspaceUrl',
                },
            ],
            buttonText: 'Create Workspace',
        },
        {},
    ],
    allPagesInputData: {},
}


export const RootReducer = (state=initialState, action) => {

    if(action.type === 'CHANGE_CURRENT_PAGE') {
        return {
            ...state,
            currentPageIndex: state.currentPageIndex+1,
        }
    }
    if(action.type === 'ADD_INPUT_PAGE_DATA') {
        return {
            ...state,
            allPagesInputData: {...state.allPagesInputData,  ...action.payload}
        }
    }
    if(action.type === 'ADD_SINGLE_CARD_INPUT') {
        return {
            ...state,
            allPagesInputData: {...state.allPagesInputData, ...{
                [action.payload.key] : action.payload.values
            }}
        }
    }


    return state;
}